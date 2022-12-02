import goldMedal from './images/gold-medal.svg'
import silberMedal from './images/silver-medal.svg'
import bronzeMedal from './images/bronze-medal.svg'
import layeredWaves from './images/layered-waves.svg'
import { nanoid } from 'nanoid'


export default function Leaderboard({ leaderboardData }) {



    function determinePosition(position) {
        switch (position) {
            case 0:
                return goldMedal
            case 1:
                return silberMedal
            case 2:
                return bronzeMedal


        }


    }
    return (

        <>
            <img alt='layered-waves' className='layered-waves' src={layeredWaves} />
            <section className='body-wrapper'>

                <div className='leaderboard-container'>
                    <div className='leaderboard-entry'>
                        <h4 className='leaderboard-position-tab leaderboard-header'>Position</h4>
                        <h4 className='leaderboard-username leaderboard-header'>Username</h4>
                        <h4 className='leaderboard-header'>Punkte</h4>
                    </div>
                    {leaderboardData && leaderboardData.map((entry, index) => (
                        <div key={nanoid()} className='leaderboard-entry'>

                            <h4 className='leaderboard-position-tab'>
                                <span className={index > 2 ? 'leaderboard-position' : ''}>{index > 2 ?
                                    index + 1 :
                                    <img alt="medal" className='medal' src={determinePosition(index)} />}
                                </span>
                            </h4>
                            <h4 className='leaderboard-username'>{entry.username}</h4>
                            <h4>{entry.points}<div className="points-icon leaderboard" >P</div></h4>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}