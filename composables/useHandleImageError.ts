

export const useHandleImageError = () => {


  const handleImageError = (imageId: string) => {

    $fetch("/api/images/sizes", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        imageId: imageId,
        maintainAspectRatio: true,
        sizes: [150, 300, 600, 800],
      },
    })

  }

  return { handleImageError }
}
