import eventBus from '@/eventBus';

export default function gotoPage(pageName, pageProps) {
  eventBus.$emit('gotoPage', pageName, pageProps);
}
