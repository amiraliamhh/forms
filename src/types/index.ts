import { IMultichoice } from "../models/questions/multichoice";
import { ISimpletext } from "../models/questions/simpletext";
import { IYesorno } from "../models/questions/yesorno";
import { IDateandtime } from "../models/questions/dateandtime";
import { ICounterq } from "../models/questions/counterq";
import { INumberspan } from "../models/questions/numberspan";

export type IQType = 'multichoice'
|'simpletext'
|'yesorno'
|'dateandtime'
|'counterq'
|'numberspan'

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

export interface IQuestionBody {
    question_type: IQType
    body: IMultichoice|ISimpletext|IYesorno|IDateandtime|ICounterq|INumberspan
}
