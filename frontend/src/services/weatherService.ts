export interface Weather {
    id: number
    ciudad: string
    temperatura: number
    humedad: number
    condicion_clima: string
    fecha_consulta: string
    temp_fahrenheit: number
  }
  
  const API_URL = 'http://127.0.0.1:8000/api'
  
  export async function getWeather(city: string): Promise<Weather> {
    const response = await fetch(
      `${API_URL}/weather?city=${encodeURIComponent(city)}`
    )
  
    if (!response.ok) {
      throw new Error('No se pudo consultar el clima.')
    }
  
    return response.json()
  }