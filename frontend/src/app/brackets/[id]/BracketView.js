export default function BracketView(props) {
    const bracket = props.bracket
    const matches = bracket.matches
    const height = 5000
    return <><div className="max-h-full max-w-full overflow-x-scroll flex flex-nowrap flex-row">
        <RoundGroup height={height} round={16}></RoundGroup>
        <RoundGroup height={height} round={8}></RoundGroup>
        <RoundGroup height={height} round={4}></RoundGroup>
        <RoundGroup height={height} round={2}></RoundGroup>
    </div>
    </>
}

export function RoundGroup({round}) {
    return <div className="inline-flex flex-col justify-around align-middle">
        {[...Array(round/2)].map((_, i) => 
            <MatchBlock key={i} round={round}></MatchBlock>
        )}
    </div>
}

export function MatchBlock({round}) {
    //const height = Math.floor(256 / parseInt(round))
    //console.log(height)

    return <div style={{height:100/round+'%'}} className={`block  border-white border-r-2 border-y-2 bg-transparent w-20 b-0`}>0</div>
}


        /*<div id="b4" className="inline-flex flex-col justify-around align-middle h-64">
            <MatchBlock text="8"></MatchBlock>
            <MatchBlock text="8"></MatchBlock>
            <MatchBlock text="8"></MatchBlock>
            <MatchBlock text="8"></MatchBlock>
        </div>
        <div id="b4" className="inline-flex flex-col justify-around align-middle h-64">
            <MatchBlock text="4"></MatchBlock>
            <MatchBlock text="4"></MatchBlock>
        </div>
        <div id="b2" className="inline-flex flex-col justify-around align-middle h-64">
            <MatchBlock text="2"></MatchBlock>
        </div>*/