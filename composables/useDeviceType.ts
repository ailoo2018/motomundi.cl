// composables/useDeviceType.ts
export const useDeviceType = () => {
  const deviceType = useCookie('device-type', { default: () => 'desktop' })
  const isMobile = computed(() => deviceType.value === 'mobile')

  return { isMobile }
}
