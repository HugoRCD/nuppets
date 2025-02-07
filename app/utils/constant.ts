export const RAYCAST_DEEPLINK = 'raycast://'

export const modifiersList = ['!', ':', '_', '__', '-', '@', '@@', '$', ';', ';;', '/', '//', 'none'] as const

export type Modifier = (typeof modifiersList)[number];

export type Modifiers = {
  start: Modifier
  end: Modifier
}
