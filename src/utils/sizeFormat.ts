export const sizeFormat = (bytes: number) => {
    if (bytes > 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024 / 1024).toFixed(2)}GB`
    if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)}MB`
    if (bytes > 1024) return `${(bytes / 1024).toFixed(2)}KB`
    else return `${bytes}B`
}
