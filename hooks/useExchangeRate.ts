import { useState, useEffect } from 'react';

interface ExchangeRateData {
  fuente: string;
  nombre: string;
  compra: number | null;
  venta: number | null;
  promedio: number;
  fechaActualizacion: string;
}

export const useExchangeRate = () => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchExchangeRate = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try BCV API first
      try {
        const bcvResponse = await fetch('https://bcv-api.vercel.app/api/exchange-rate');
        if (bcvResponse.ok) {
          const bcvData = await bcvResponse.json();
          if (bcvData.rate) {
            setExchangeRate(bcvData.rate);
            setLastUpdated(new Date().toISOString());
            console.log('BCV Exchange rate updated:', bcvData.rate);
            return;
          }
        }
      } catch (bcvError) {
        console.log('BCV API failed, trying fallback...');
      }
      
      // Fallback to dolarapi
      const response = await fetch('https://ve.dolarapi.com/v1/dolares/oficial');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ExchangeRateData = await response.json();
      
      setExchangeRate(data.promedio);
      setLastUpdated(data.fechaActualizacion);
      
      console.log('Fallback exchange rate updated:', data.promedio);
      
    } catch (err) {
      console.error('Error fetching exchange rate:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      // Don't set fallback rate - let UI handle the loading/error state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
    
    // Update every 30 minutes
    const interval = setInterval(fetchExchangeRate, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const refreshRate = () => {
    fetchExchangeRate();
  };

  return {
    exchangeRate,
    loading,
    error,
    lastUpdated,
    refreshRate
  };
};



