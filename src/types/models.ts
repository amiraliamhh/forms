export interface IQuestionCreator<T=any> {
    create(q: T): Promise<T & { id: number }>
}