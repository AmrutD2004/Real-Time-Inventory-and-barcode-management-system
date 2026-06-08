import Hashids from 'hashids'

export const encodeId = async(id : number)=>{
    const hashId = new Hashids(import.meta.env.VITE_HASH_SECRET, 20)
    return hashId.encode(id)
}

export const decodeId = async(id : string)=>{
    const hashId = new Hashids(import.meta.env.VITE_HASH_SECRET, 20)
    return hashId.decode(id)
}