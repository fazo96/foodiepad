import { decodeGlobalID, encodeGlobalID } from '@pothos/plugin-relay'

export function prismaNodeRelayOptions (name: string) {
  return {
    id: {
      resolve: (item: { id: number }) => encodeGlobalID(name, item.id)
    },
    findUnique: (id: string) => ({ id: parseInt(decodeGlobalID(id).id, 10) })
  }
}
