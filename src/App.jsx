import { useState } from "react";
import React from "react";


export default function App() {
    const initialMoney = 800;
    const initialAlive = true;
    const initialRoundCount = 0;
    const initialWinRoundCount = 0;
    const initialLoseRoundCount = 0;
    const initialKillCount = 0;
    const initialSpike = true;
    const initialRoundWin = true;
    const initialDefeatCount = 0;

    const weaponPrices = {
        crassic: 0,
        shorty: 300,
        frenzy: 450,
        ghost: 500,
        sheriff: 800,
        stinger: 1100,
        specter: 1600,
        bucky: 850,
        judge: 1850,
        bulldog: 2000,
        guardian: 2150,
        phantom: 3200,
        vandal: 3200,
        marshal: 900,
        operator: 4700,
        ares: 1600,
        odin: 3200,
    };

    const armorPrices = {
        halfArmor: 400,
        fullArmor: 1000,
    }
    const [subweapon, setsubweapon] = useState("crassic");
    const [mainweapon, setmainweapon] = useState("");
    const [armor, setArmor] = useState("");
    const [prevmoney, setMoney] = useState(initialMoney);
    const [alive, setalive] = useState(initialAlive);
    const [prevRoundCount, setroundCount] = useState(initialRoundCount);
    const [winRoundCount, setWinRoundCount] = useState(initialWinRoundCount);
    const [loseRoundCount, setloseRoundCount] = useState(initialLoseRoundCount);
    const [killCount, setkillCount] = useState(initialKillCount);
    const [spike, setSpike] = useState(initialSpike);
    const [roundWin, setRoundWin] = useState(initialRoundWin);
    const [defeatCount, setDefeatCount] = useState(initialDefeatCount);

    const resetValues = () => {
        setsubweapon("crassic");
        setmainweapon("");
        setMoney(initialMoney);
        setalive(initialAlive);
        setroundCount(initialRoundCount);
        setkillCount(initialKillCount);
        setSpike(initialSpike);
        setRoundWin(initialRoundWin);
        setDefeatCount(initialDefeatCount);
    };

    const handleSubweaponChange = (selectedWeapon) => {
        const selectedWeaponPrice = weaponPrices[selectedWeapon] || 0;
        const currentSubweaponPrice = weaponPrices[subweapon] || 0;
        setMoney((prevMoney) => prevMoney + currentSubweaponPrice);
        setMoney((prevMoney) => prevMoney - selectedWeaponPrice);
        setsubweapon(selectedWeapon);
    };

    const handleMainweaponChange = (selectedWeapon) => {
        const selectedWeaponPrice = weaponPrices[selectedWeapon] || 0;
        const currentMainweaponPrice = weaponPrices[mainweapon] || 0;
        setMoney((prevMoney) => prevMoney + currentMainweaponPrice);
        setMoney((prevMoney) => prevMoney - selectedWeaponPrice);
        setmainweapon(selectedWeapon);
    };

    const handleArmorChange = (selectedArmor) => {
        const selectedArmorPrice = armorPrices[selectedArmor] || 0;
        const currentArmorPrice = armorPrices[armor] || 0;
        setMoney((prevMoney) => prevMoney + currentArmorPrice);
        setMoney((prevMoney) => prevMoney - selectedArmorPrice);
        setArmor(selectedArmor);
    }

    function aliveChange() {
        setalive(true);
    }
    function deathChange() {
        setalive(false);
    }
    function winRound() {
        setRoundWin(true);
    }
    function loseRound() {
        setRoundWin(false);
    }
    function caSpike() {
        setSpike(true);
    }
    function noSpike() {
        setSpike(false);
    }
    function nextRound() {
        let count = 0;
        const nowKillCount = document.getElementById("nowRoundKill").value;
        setkillCount(parseInt(nowKillCount, 10));
        if (alive) {
            count += roundWin ? 3000 : 1000;
        } else {
            count += roundWin ? 3000 : 1900;
            setsubweapon("crassic");
            setmainweapon("");
            setArmor("");
        }
        if (roundWin) {
            setWinRoundCount((winRoundCount) => winRoundCount + 1);
        } else {
            if(1 < defeatCount < 3){
                count += defeatCount * 500;
            }
            if (defeatCount < 3) {
                setDefeatCount((defeatCount) => defeatCount + 1);
            }
            setloseRoundCount((loseRoundCount) => loseRoundCount + 1);
        }
        count += parseInt(nowKillCount, 10) * 200;
        if (spike) {
            count += 300;
        }
        setMoney((prevMoney) => prevMoney + count);
        setroundCount((prevRoundCount) => prevRoundCount + 1);
    }
    const KillOptions = [];
    for (let i = 0; i <= 5; i++) {
        KillOptions.push(<option key={i} value={i}>{i}</option>);
    }

    return (
        <>
            <header>
                <h1>Valorant money simurate</h1>
            </header>
            <div>
                <label htmlFor="current weapon">current weapon : </label>
                {subweapon}, {mainweapon}, {armor}
            </div>
            <div>
                <label htmlFor="verse-subweapon">Choose a sub weapon : </label>
                <select id="verse-subweapon" onChange={(e) => handleSubweaponChange(e.target.value)}>
                    <option value="crassic">crassic</option>
                    <option value="shorty">shorty</option>
                    <option value="frenzy">frenzy</option>
                    <option value="ghost">ghost</option>
                    <option value="sheriff">sheriff</option>
                </select>
            </div>
            <div>
                <label htmlFor="verse-mainweapon">Choose a weapon : </label>
                <select id="verse-mainweapon" onChange={(e) => handleMainweaponChange(e.target.value)}>
                    <option value=""></option>
                    <option value="stinger">stinger</option>
                    <option value="specter">specter</option>
                    <option value="bucky">bucky</option>
                    <option value="judge">judge</option>
                    <option value="bulldog">bulldog</option>
                    <option value="guardian">guardian</option>
                    <option value="phantom">phantom</option>
                    <option value="vandal">vandal</option>
                    <option value="marshal">marshal</option>
                    <option value="operator">operator</option>
                    <option value="ares">ares</option>
                    <option value="odin">odin</option>
                </select>
            </div>
            <div>
                <label htmlFor="verse-armor">Choose an armor : </label>
                <select id="verse-armor" onChange={(e) => handleArmorChange(e.target.value)}>
                    <option value=""></option>
                    <option value="halfArmor">half armor</option>
                    <option value="fullArmor">full armor</option>
                </select>
            </div>
            <div>
                <label htmlFor="nowRoundKill">Now round killcount : </label>
                <select id="nowRoundKill">
                    {KillOptions}
                </select>
            </div>
            <div class="radio-container">
                <input type="radio" value="alive" checked={alive === true} onClick={aliveChange} />
                <label htmlFor="arrive">alive</label>
                <input type="radio" value="death" checked={alive === false} onClick={deathChange} />
                <label htmlFor="death">death</label>
            </div>
            <div class="radio-container">
                <input type="radio" value="win" checked={roundWin === true} onClick={winRound} />
                <label htmlFor="arrive">roundWin</label>
                <input type="radio" value="lose" checked={roundWin === false} onClick={loseRound} />
                <label htmlFor="death">roundLose</label>
            </div>
            <div class="radio-container">
                <input type="radio" value="prant or defuse" checked={spike === true} onClick={caSpike} />
                <label htmlFor="arrive">prant or defuse spike</label>
                <input type="radio" value="can't prant or defuse" checked={spike === false} onClick={noSpike} />
                <label htmlFor="death">can't prant of defuse spike</label>
            </div>
            <div>
                <button onClick={nextRound}>next Round</button>
            </div>
            <div>
                nowmoney: {prevmoney}
                <p />
                nowRoundCount: {prevRoundCount}
                <p />
                roundwin: {winRoundCount} lose: {loseRoundCount}
            </div>
            <div>
                <button onClick={resetValues}>Reset</button>
            </div>
            <footer>
                <p>5422085 井澤大翔 webプログラミング演習課題</p>
                <p>web APIの使用方法がよくわからなかったため使用しないで作成しました。</p>
            </footer>
        </>
    );
}