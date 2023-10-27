type ReadonlyDeep<T extends Record<any, any>> = {
  readonly [P in keyof T]: T[P] extends Record<any, any>
    ? ReadonlyDeep<T[P]>
    : T[P]
}

export default ReadonlyDeep
