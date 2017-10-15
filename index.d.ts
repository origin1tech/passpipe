
import { ChildProcess as ChildProc } from 'child_process'

declare interface ChildProcess extends ChildProc { }
declare type DoneCallack = (chunk: string) => void;
declare type PipeMethod = (...args: any[]) => void;

declare function passpipe(method: string | PipeMethod | ChildProcess, args: string | any[] | DoneCallack, done: DoneCallack): ChildProcess;

export = passpipe;