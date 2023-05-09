import eventBus from '@/eventBus';

// Вынесли отдельно функцию отправляющую событие на переключение событий для избежания дублирования кода
export default function gotoPage(pageName, pageProps) {
  eventBus.$emit('gotoPage', pageName, pageProps);
};
