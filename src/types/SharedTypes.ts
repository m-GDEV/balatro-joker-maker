import { Key } from "react";

export type KeyValue<K extends string, V = unknown> = {
    key: K;
    value: V;
}
export type overlayOptionsType = KeyValue<string, string>[];