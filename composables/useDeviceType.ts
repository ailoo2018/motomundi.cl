// composables/useDeviceType.ts
export const useDeviceType = () => {
  const deviceType = useCookie('device-type', { default: () => 'desktop' })
  const isMobile = computed(() => deviceType.value === 'mobile')
  const isDesktop = computed(() => deviceType.value === 'desktop')

  return { isMobile,  isDesktop }
}
