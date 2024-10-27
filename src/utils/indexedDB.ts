export const saveCryptoKeyToDB = async (key: CryptoKey): Promise<void> => {
  const exportedKey = await crypto.subtle.exportKey('raw', key)

  const db = await openDatabase()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('keys', 'readwrite')
    const store = transaction.objectStore('keys')

    store.put({ id: 'encryptionKey', key: exportedKey })

    transaction.oncomplete = () => {
      resolve()
    }

    transaction.onerror = () => reject(transaction.error)
  })
}

export const getCryptoKeyFromDB = async (): Promise<CryptoKey | null> => {
  const db = await openDatabase()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('keys', 'readonly')
    const store = transaction.objectStore('keys')
    const getRequest = store.get('encryptionKey')

    getRequest.onsuccess = async () => {
      const result = getRequest.result

      if (result) {
        try {
          const cryptoKey = await crypto.subtle.importKey(
            'raw',
            result.key,
            { name: 'AES-GCM' },
            true,
            ['encrypt', 'decrypt']
          )
          resolve(cryptoKey)
        } catch (error) {
          console.error('Error al importar la clave:', error)
          resolve(null)
        }
      } else {
        resolve(null)
      }
    }

    getRequest.onerror = () => reject(getRequest.error)
  })
}


const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('cryptoDB', 1)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('keys')) {
        db.createObjectStore('keys', { keyPath: 'id' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}
