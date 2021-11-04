const modules = import.meta.glob('../assets/image/*.jpg')

export async function asyncImage(): Promise<any> {
  const imageUrl: string[] = []

  for (const path in modules) {
    const mod = await modules[path]()
    imageUrl.push(mod.default)
  }

  return imageUrl
}
