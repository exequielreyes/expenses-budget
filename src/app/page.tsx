'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useGoogleAuth } from "@hooks/useGoogleAuth"
import { signOut } from "@lib/googleAuth"
import { ChevronRight, PieChart, DollarSign, TrendingDown } from 'lucide-react'
import { useRouter } from "next/navigation"

export default function Home() {

  const { signInWhithGoogle, userData } = useGoogleAuth()
  const router = useRouter()

  const handleLogin = async () => {
    console.log(userData)
    if (!userData) {
      await signInWhithGoogle()
      router.refresh()
    }
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Expenses Budget</h1>
          <Button variant="outline" onClick={handleLogin}>{userData ? `Ir a mi Dashboard (${userData.email})` : 'Iniciar sesión con Google'}</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl mb-4">
            Controla tus gastos, alcanza tus metas
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Expenses Budget te ayuda a tomar el control de tus finanzas personales de manera fácil y efectiva.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Button className="w-full sm:w-auto" onClick={() => signOut()} >
              Comienza gratis
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: PieChart,
              title: "Visualiza tus gastos",
              description: "Obtén gráficos claros y detallados de dónde va tu dinero para tomar mejores decisiones financieras.",
              color: "text-blue-500"
            },
            {
              icon: DollarSign,
              title: "Establece presupuestos",
              description: "Crea presupuestos personalizados para diferentes categorías y mantén tus gastos bajo control.",
              color: "text-green-500"
            },
            {
              icon: TrendingDown,
              title: "Reduce gastos innecesarios",
              description: "Identifica áreas donde puedes ahorrar y recibe consejos para reducir tus gastos de manera efectiva.",
              color: "text-red-500"
            }
          ].map((feature, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <feature.icon className={`mr-2 h-6 w-6 ${feature.color}`} />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="dark:text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ¿Listo para tomar el control de tus finanzas?
          </h3>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            Prueba Expenses Budget gratis
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © 2025 Expenses Budget. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

