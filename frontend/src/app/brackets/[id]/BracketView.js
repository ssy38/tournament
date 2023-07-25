'use client'
const seedOrder = {
    2: [[1, 2]],
    4: [[1, 4], [2, 3]],
    8: [[1, 8], [4, 5], [2, 7], [3, 6]],
    16: [[1, 16], [8, 9], [4, 13], [5, 12], [2, 15], [7, 10], [3, 14], [6, 11]],
    32: [[1, 32], [16, 17], [8, 25], [9, 24], [4, 29], [13, 20], [5, 28], [12, 21], [2, 31], [15, 18], [7, 26], [10, 23], [3, 30], [14, 19], [6, 27], [11, 22]],
    64: [],
}

export default function BracketView(props) {
    const bracket = props.bracket
    const matches = bracket.matches
    const numMatches = matches.length
    const height = 800
    return <div className="max-h-screen w-screen overflow-scroll">
        <div style={{height:height+'px'}} className={`flex flex-row w-fit`}>
            <RoundGroup round={8} teams={true}></RoundGroup>
            <RoundGroup round={4}></RoundGroup>
            <RoundGroup round={2}></RoundGroup>
        </div>
    </div>
}



export function RoundGroup({round, teams}) {
    return <div className="inline-flex flex-col justify-around align-middle w-fit">
        {[...Array(round/2)].map((_, i) => 
            <MatchBlock key={i} round={round} labels={teams ? seedOrder[round][i] : ['-','-']}></MatchBlock>
        )}
    </div>
}

export function MatchBlock({round, labels}) {
    return <><div style={{height:100/round+'%'}} className={`inline-flex flex-col relative items-center border-white border-r-2 border-y-2 bg-transparent w-[200px] b-0`}>
        <div className="overflow-hidden px-1 absolute flex flex-nowrap top-0 justify-center items-center bg-slate-800 rounded-xl border-2 w-[80%] h-16 text-lg transform -translate-y-1/2">
            {labels[0]}
        </div>

        <div className="overflow-hidden px-1 absolute flex flex-nowrap bottom-0 justify-center items-center bg-slate-800 rounded-xl border-2 w-[80%] h-16 text-lg transform translate-y-1/2">
            {labels[1]}
        </div>


        </div>

    </>
}