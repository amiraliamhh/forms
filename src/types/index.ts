export type IQType = 'multichoice'

export interface IQuestion {
    question_type: IQType
    qid: number
}

export interface IResponseGlobalOptions {
    lang?: 'fa'|'en'
}

export interface IStandardResponse {
    error_msg: string|null
    data: any
}
