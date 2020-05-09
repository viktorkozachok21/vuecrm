export default {
  bind(element, { value }) {
    M.Tooltip.init(element, { html: value })
  },
  unbind(element) {
    const tooltip = M.Tooltip.getInstance(element)

    if (tooltip && tooltip.destroy) tooltip.destroy()
  }
}
