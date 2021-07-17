class App {
    private buttons: HTMLElement;
    private cards: HTMLDivElement;
    private inputMonth: HTMLInputElement;
    private inputCards: HTMLInputElement;


    constructor() {
        this.inputMonth = document.getElementById('month') as HTMLInputElement;
        this.inputCards = document.getElementById('cards-input') as HTMLInputElement;
        this.cards = document.querySelector('.cards') as HTMLDivElement;
        this.buttons= document.querySelector('.buttons') as HTMLElement;
        this.buttons.addEventListener('click', (ev) => {
            this.makeAction(ev);
        });
    }

    private makeAction(ev: MouseEvent) {
        let btn = ev.target as HTMLButtonElement;

        switch (btn.dataset['cmd']) {
            case 'generate': {
                this.generate();
                break;
            }

            case 'print': {
                window.print();
                break;
            }

            case 'clear': {
                this.cards.innerHTML = '';
                break;
            }
        }
    }

    private generate() {
        if (! this.inputMonth.checkValidity()) {
            this.inputMonth.reportValidity();
            return
        } else if (! this.inputCards.checkValidity()) {
            this.inputCards.reportValidity();
            return
        }
        
        let cardList: Array<string> = this.inputCards.value.split(',') || [];
        let days = this.getDaysInMonth();
        this.cards.innerHTML = '';
        cardList.forEach(workerNo => {
            this.cards.appendChild(new Card(days, workerNo));
        });

    }

    private getDaysInMonth(): number {
        let date = new Date(this.inputMonth.value);
        return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    }
}


class Card extends HTMLElement {
    private workerNo:string;
    private monthDays:number;

    constructor(days:number, worker: string) {
        super();
        this.monthDays = days;
        this.workerNo = worker;
    }

    private createHeader() {
        let header = document.createElement('header');
        header.innerHTML = `
        <div>
            <label class="label">LISTA OBECNOŚCI ZA MIESIĄC: </label><span>Lipiec 2021</span>
        </div>
        <div>
            <label class="label">Nr pracownika (zgodny z kartą wejsciową): </label><span>${this.workerNo}</span>
        </div>`;

        this.appendChild(header);
    }

    private createTable() {
        let table = document.createElement('table');
        table.className = 'worker-card';
        let tHead = document.createElement('thead');
        let tBody = document.createElement('tbody');
        tHead.innerHTML = `
          <tr>
             <th rowspan="2" class="bold">DATA</th>
             <th rowspan="2" class="bold">DZIEŃ</th> 
             <th rowspan="2" class="bold">NOC</th>
             <th colspan="2" class="font-small">PODPIS <strong>numeryczny</strong> - sam nr wg karty</th>
             <th rowspan="2">
                <span class="font-small">INFORMACJE DODATKOWE DLA PRACODAWCY</span><br>
                <span class="font-smaller">(w przypadku zastępstwa proszę wpisać za kogo)</span>
            </th>
          </tr>
          <tr>
             <th>PRACOWNIKA</th>
             <th>PRZEŁOŻONEGO</th>
          </tr>`

        for (let day = 1;day <= this.monthDays; day++) {
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            td.innerHTML= `<strong>${day}</strong>`;
            tr.appendChild(td);
            tr.appendChild(document.createElement('td'));
            tr.appendChild(document.createElement('td'));
            tr.appendChild(document.createElement('td'));
            tr.appendChild(document.createElement('td'));
            tr.appendChild(document.createElement('td'));
            tBody.appendChild(tr)
        }
        table.appendChild(tHead);
        table.appendChild(tBody);
        this.appendChild(table);

    }

    private createFooter() {
        let footer = document.createElement('footer');
        footer.innerHTML = `
        <table class="summary">
        <caption class="bold">WYPEŁNIA PRACODAWCA !!!</caption>
            <tr>
                <th colspan="2">GODZINY</th>
                <th colspan="2">RAZEM</th>
            </tr>
            <tr>
                <td>DZIEŃ</td>
                <td></td>
                <td rowspan="2"></td>
                <td rowspan="3"></td>
            </tr>
            <tr>
                <td>NOC</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2">URLOP</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="3">STATYSTYCZNE</td>
                <td></td>
            </tr>
        </table>`;

        this.appendChild(footer);
    }

    public connectedCallback() {
        this.createHeader();
        this.createTable();
        this.createFooter();
    }
}

window.customElements.define('work-card', Card);

window.addEventListener('load', () => {
    new App();
})