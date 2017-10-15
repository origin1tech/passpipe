
import { ChildProcess as ChildProc } from 'child_process'

declare interface ChildProcess extends ChildProc { }
declare type DoneCallack = (chunk: string) => void;
declare type PipeMethod = (...args: any[]) => void;

declare function command(command: string, args: string | any[], done: DoneCallack): ChildProcess;

declare function method(method: PipeMethod, args: string | any[], done: DoneCallack): ChildProcess;

declare function proc(proc: ChildProcess, done: DoneCallack): ChildProcess;

export { command, method, proc };
