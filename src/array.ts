import { clamp } from './math'
import { Arrayable, Nullable } from './types'

/**
 * Convert `Arrayable<T>` to `Array<T>`
 *
 * @category Array
 */
export function toArray<T>(array?: Nullable<Arrayable<T>>): Array<T> {
  array = array || []
  if (Array.isArray(array))
    return array
  return [array]
}

/**
 * Convert `Arrayable<T>` to `Array<T>` and flatten it
 *
 * @category Array
 */
export function flattenArrayable<T>(array?: Nullable<Arrayable<T | Array<T>>>): Array<T> {
  return toArray(array).flat(1) as Array<T>
}

/**
 * Use rest arguments to merge arrays
 *
 * @category Array
 */
export function mergeArrayable<T>(...args: Nullable<Arrayable<T>>[]): Array<T> {
  return args.flatMap(i => toArray(i))
}

/**
 * Divide an array into two parts by a filter function
 *
 * @category Array
 * @example const [odd, even] = partition([1, 2, 3, 4], i => i % 2 != 0)
 */
export function partition<T>(array: readonly T[], filter: (i: T, idx: number, arr: readonly T[]) => any) {
  const pass: T[] = []
  const fail: T[] = []
  array.forEach((e, idx, arr) => (filter(e, idx, arr) ? pass : fail).push(e))
  return [pass, fail]
}

/**
 * Unique an Array
 *
 * @category Array
 */
export function uniq<T>(array: readonly T[]): T[] {
  return Array.from(new Set(array))
}

/**
 * Get last item
 *
 * @category Array
 */
export function last(array: readonly []): undefined
export function last<T>(array: readonly T[]): T
export function last<T>(array: readonly T[]): T | undefined {
  return at(array, -1)
}

/**
 * Remove an item from Array
 *
 * @category Array
 */
export function remove<T>(array: T[], value: T) {
  if (!array)
    return false
  const index = array.indexOf(value)
  if (index >= 0) {
    array.splice(index, 1)
    return true
  }
  return false
}

/**
 * Get nth item of Array. Negative for backward
 *
 * @category Array
 */
export function at(array: readonly [], index: number): undefined
export function at<T>(array: readonly T[], index: number): T
export function at<T>(array: readonly T[] | [], index: number): T | undefined {
  const len = array.length
  if (!len)
    return undefined

  if (index < 0)
    index += len

  return array[index]
}

/**
 * Genrate a range array of numbers. The `stop` is exclusive.
 *
 * @category Array
 */
export function range(stop: number): number[]
export function range(start: number, stop: number, step?: number): number[]
export function range(...args: any): number[] {
  let start: number, stop: number, step: number

  if (args.length === 1) {
    start = 0
    step = 1;
    ([stop] = args)
  }
  else {
    ([start, stop, step = 1] = args)
  }

  const arr: number[] = []
  let current = start
  while (current < stop) {
    arr.push(current)
    current += step || 1
  }

  return arr
}

/**
 * Move element in an Array
 *
 * @category Array
 * @param arr
 * @param from
 * @param to
 */
export function move<T>(arr: T[], from: number, to: number) {
  arr.splice(to, 0, arr.splice(from, 1)[0])
  return arr
}

/**
 * Clamp a number to the index ranage of an array
 *
 * @category Array
 */
export function clampArrayRange(n: number, arr: readonly unknown[]) {
  return clamp(n, 0, arr.length - 1)
}
