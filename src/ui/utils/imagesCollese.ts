import { isString } from 'radash'

type ImageLike = string | { src: string } | undefined
export const resolveImage = (thing: ImageLike) => {
	if (isString(thing)) {
		return thing
	}
	return thing?.src
}
