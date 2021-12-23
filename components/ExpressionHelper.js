import { evaluate, parse } from 'mathjs'
  
export function graphSearch(node){
    let result = {}

    if (node.name && !node.args){
        result[node.name] = 0
    } else if (node.args){
        const keys = Object.keys(node.args)
        for(let i = 0; i < keys.length; i++)
            result = {...result, ...graphSearch(node.args[keys[i]])}
    } else if (node.content){
        result = {...result, ...graphSearch(node.content)}
    }
    return result

}


export function magic(dict, s){
    let result;
    
    result = parse(s)
    const rdict = graphSearch(result)
    const l = Object.keys(rdict)
    let ndict = {}
    for(let i = 0; i < l.length; i++){
        ndict[l[i]] = dict[l[i]] || 0
    }

    return {result: evaluate(s, ndict), dict: ndict}
}

export function getMean(task){
    const mean = task.mean

    if (mean.length == 0){
        return "-"
    }
    return("" + magic(task.grades.mean, task.mean).result)
}

export function getFrequency(task){
    const frequency = task.frequency

    if (frequency.length == 0){
        return "-"
    }
    return("" + magic(task.grades.frequency, task.frequency).result)
}



// try {
//     console.log(magic({c: 1, b: 2, j:1000 },"A + c + b + D*i"))
// } catch(e){
//     console.log("deu erro", e)
// }