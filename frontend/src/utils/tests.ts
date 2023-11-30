export async function resolvedComponent(Component: any, props: unknown) {
  const ComponentResolved = await Component(props)
  return () => ComponentResolved
}
