class App {
    private buttons: HTMLElement;
    private cards: HTMLDivElement;
    private inputMonth: HTMLInputElement;
    private inputCards: HTMLInputElement;
    private inputWithoutNo: HTMLInputElement;
    private storage: Storage = window.localStorage;


    constructor() {
        this.inputMonth = document.getElementById('month') as HTMLInputElement;
        this.inputCards = document.getElementById('cards-input') as HTMLInputElement;
        this.inputWithoutNo = document.getElementById('without-no') as HTMLInputElement;
        this.cards = document.querySelector('.cards') as HTMLDivElement;
        this.buttons= document.querySelector('.buttons') as HTMLElement;
        let storedCards:string = this.storage.getItem('cards') || '';
        if (storedCards) {
            this.inputCards.value = storedCards;
        }
        this.buttons.addEventListener('click', (ev) => {
            this.makeAction(ev);
        });
    }

    private async makeAction(ev: MouseEvent) {
        let btn = ev.target as HTMLButtonElement;

        switch (btn.dataset['cmd']) {
            case 'generate': {
                this.generate();
                break;
            }

            case 'print': {
                await this.printCards();
                break;
            }

            case 'clear': {
                this.cards.innerHTML = '';
                this.inputCards.value = '';
                break;
            }
        }
    }

    private async printCards() {
        window.print();
    }

    private generate() {
        if (! this.inputMonth.checkValidity()) {
            this.inputMonth.reportValidity();
            return
        } else if (! this.inputCards.checkValidity()) {
            this.inputCards.reportValidity();
            return
        }
        this.storage.setItem('cards', this.inputCards.value);
        let cardList: Array<string> = this.inputCards.value.split(',') || [];
        this.cards.innerHTML = '';
        if (this.inputWithoutNo.checked ) {
            this.cards.appendChild(new Card(this.getDaysInMonth(), this.getMonthYearString(), ''));
            return;
        }
        
        cardList.forEach(workerNo => {
            this.cards.appendChild(new Card(this.getDaysInMonth(), this.getMonthYearString(), workerNo));
        });

    }

    private getDaysInMonth(): number {
        let date = new Date(this.inputMonth.value);
        return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    }

    private getMonthYearString():string {
        let date = new Date(this.inputMonth.value);
        return date.toLocaleString('pl-PL', { month: 'long', year: 'numeric' })
    }
}


class Card extends HTMLElement {
    private workerNo:string;
    private monthDays:number;
    private dateLong:string;

    constructor(days:number, date:string, worker: string) {
        super();
        this.monthDays = days;
        this.dateLong = date;
        this.workerNo = worker;
        this.className = 'page-a4';
    }

    private createHeader() {
        let header = document.createElement('header');
        header.innerHTML = `
        <div>
            <label class="label label-margin">LISTA OBECNOŚCI ZA MIESIĄC: </label><span class="font-1">${this.dateLong.toUpperCase()}</span>
        </div>
        <div>
            <label class="label label-margin">Nr pracownika (zgodny z kartą wejsciową): </label><span class="font-1">${this.workerNo}</span>
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
             <th rowspan="2" class="date">DATA</th>
             <th rowspan="2" class="">DZIEŃ</th> 
             <th rowspan="2" class="">NOC</th>
             <th colspan="2" class="font-small">PODPIS <strong>numeryczny</strong> - sam nr wg karty</th>
             <th rowspan="2">
                <span class="font-small">INFORMACJE DODATKOWE DLA PRACODAWCY</span><br>
                <span class="font-smaller">(w przypadku zastępstwa proszę wpisać za kogo)</span>
            </th>
          </tr>
          <tr>
             <th class="font-small">PRACOWNIKA</th>
             <th class="font-small">PRZEŁOŻONEGO</th>
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
                <th colspan="2" style="width:50%">GODZINY</th>
                <th colspan="2" style="width:50%">RAZEM</th>
            </tr>
            <tr>
                <td style="width:25%">DZIEŃ</td>
                <td style="width:25%"></td>
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