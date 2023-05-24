import './globals.css'
import Link from 'next/link'

export default function Home() {
    let name = 'Kim Dong Min';
    return (
        <div>
            
            <h1 className='title'>휴과 관리 프로그램!</h1>
            <p className='title-sub'>by {name}</p>
        </div>
    );
}
