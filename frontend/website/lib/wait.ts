// eslint-disable-next-line import/no-anonymous-default-export
export default function (duration:number){
    return new Promise(resolve => setTimeout(resolve,duration))
}