interface IWorkCardProps {
  date: string;
  worker: string;
}

export function WorkCard(props: IWorkCardProps) {
  const date = new Date(props.date);
  const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const daysElement = () => {
    const elm = [];
    for (let day = 1; day <= days; day++) {
      elm.push(
        <tr key={day}>
          <td className="font-semibold">{day}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>,
      );
    }
    return elm;
  };
  return (
    <div
      className="grid grid-rows-[1fr_14fr_1fr]
                 w-[220mm] h-[307mm] p-[10mm]
               bg-white text-black mb-1 !text-[11px]
                 print:w-[210mm] print:h-[297mm] print:p-0 print:break-after-page"
    >
      <header className="font-semibold">
        <div className="grid">
          <div className="grid grid-cols-3">
            <span>LISTA OBECNOŚCI ZA MIESIĄC:</span>
            <span className="justify-self-center text-[1rem]">
              {date.toLocaleString("pl-PL", { month: "long", year: "numeric" }).toLocaleUpperCase()}
            </span>
          </div>
          <div className="grid grid-cols-3">
            <span>Nr pracownika (zgodny z kartą wejściową):</span>
            <span className="justify-self-center text-[1rem]">
              {props.worker}
            </span>
          </div>
        </div>
      </header>
      <table className="font-normal leading-none">
        <thead>
          <tr>
            <th rowSpan={2} className="min-w-[3.5rem] font-medium">
              DATA
            </th>
            <th rowSpan={2} className="font-medium">
              DZIEŃ
            </th>
            <th rowSpan={2} className="font-medium">
              NOC
            </th>
            <th colSpan={2} className="text-[9px] font-medium">
              PODPIS <strong>numeryczny</strong> - sam nr wg karty
            </th>
            <th rowSpan={2}>
              <div className="text-[9px] font-medium">
                INFORMACJE DODATKOWE DLA PRACODAWCY
              </div>
              <div className="text-[7px] font-medium">
                (w przypadku zastępstwa proszę wpisać za kogo)
              </div>
            </th>
          </tr>
          <tr>
            <th className="text-[9px] font-medium">PRACOWNIKA</th>
            <th className="text-[9px] font-medium">PRZEŁOŻONEGO</th>
          </tr>
        </thead>
        <tbody>{daysElement()}</tbody>
      </table>
      <footer className="mt-2">
        <table className="w-[70%] leading-none">
          <caption className="font-bold text-left mb-01">
            WYPEŁNIA PRACODAWCA !!!
          </caption>
          <thead>
            <tr className="h-015">
              <th colSpan={2}>GODZINY</th>
              <th colSpan={2}>RAZEM</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-013">
              <td className="w-[25%] text-left px-02">DZIEŃ</td>
              <td className="w-[25%] text-left"></td>
              <td rowSpan={2} className="text-left"></td>
              <td rowSpan={3} className="text-left"></td>
            </tr>
            <tr className="h-013">
              <td className="text-left px-02">NOC</td>
              <td className="text-left"></td>
            </tr>
            <tr className="h-013">
              <td colSpan={2} className="text-left px-02">
                URLOP
              </td>
              <td className="text-left"></td>
            </tr>
            <tr className="h-013">
              <td colSpan={3} className="text-left px-02">
                STATYSTYCZNE
              </td>
              <td className="text-left"></td>
            </tr>
          </tbody>
        </table>
      </footer>
    </div>
  );
}
