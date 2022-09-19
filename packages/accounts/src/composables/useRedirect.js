export function useRedirect(config) {
  if (!config) {
    config = { allowedHosts: [] }
  }

  const isAllowedHost = (target) => {
    const targetUrl = new URL(target)

    return config.allowedHosts.includes(targetUrl.hostname)
  }

  const redirect = (target) => {
    if (isAllowedHost(target)) {
      window.location.href = target

      return true
    }

    return false
  }

  return { redirect }
}
