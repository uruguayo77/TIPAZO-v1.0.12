// Утилита для замены стандартного Alert на кастомный
// Можно использовать для быстрой замены Alert.alert в существующем коде

let showAlertFunction: ((title: string, message?: string, buttons?: any[]) => void) | null = null;

export const setGlobalAlertFunction = (fn: (title: string, message?: string, buttons?: any[]) => void) => {
  showAlertFunction = fn;
};

export const Alert = {
  alert: (title: string, message?: string, buttons?: any[]) => {
    if (showAlertFunction) {
      showAlertFunction(title, message, buttons);
    } else {
      // Fallback к стандартному Alert если кастомный не настроен
      require('react-native').Alert.alert(title, message, buttons);
    }
  }
};







