"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "./components/Button";
import { CheckBox } from "./components/CheckBox";
import { Form } from "./components/Form";
import { Input } from "./components/Input";
import { WorkCard } from "./components/WorkCard";

export default function Novopak() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [workCards, setWorkCards] = useState<React.ReactNode>(<></>);
  const [isCardRequired, setIsCardRequired] = useState(true);
  const [month, setMonth] = useState("");
  const [cards, setCards] = useState("");
  
  useEffect(() => {
    const date = new Date();
    setMonth(`${date.getFullYear()}-${date.getMonth() + 1}`);
    setCards(window.localStorage.getItem("cards") || "");
  }, []);

  const generateCards = (ev: FormEvent) => {
    ev.preventDefault();
    const cardData = new FormData(ev.target as HTMLFormElement);
    let cardList = (cardData.get("cards")?.toString() || "").split(",");
    const dateString = cardData.get("month")?.toString() || "";
    if (cardData.get("empty-card")) {
      cardList = [""];
    }
    generate(cardList, dateString);
    window.localStorage.setItem(
      "cards",
      cardData.get("cards")?.toString() || "",
    );
  };

  function generate(cardList: string[], dateString: string) {
    const cardsElement = cardList.map((no, index) => {
      return <WorkCard date={dateString} worker={no} key={index} />;
    });
    setWorkCards(cardsElement);
    setIsDisabled(false);
  }

  const clean = () => {
    setWorkCards(<></>);
    setIsDisabled(true);
    setIsCardRequired(true);
  };

  const emptyCard = (checked: boolean) => {
    setIsCardRequired(!checked);
  };

  return (
    <div className="grid items-start justify-items-center p-1 gap-1 bg-background text-onBackground text-base">
      <div className="bg-surface text-onSurface rounded-lg p-1 w-full print:hidden">
        <Form onSubmit={generateCards} submitMethod={"POST"}>
          <div className="grid grid-cols-[auto_1fr] gap-1">
            <Input
              id={"month"}
              type={"month"}
              label={"Wybierz Miesiąc"}
              required
              value={month}
            />
            <Input
              id={"cards"}
              type={"text"}
              label={"Podaj numery kart oddziel przecinkami"}
              required={isCardRequired}
              value={cards}
            />
          </div>
          <CheckBox
            label="Pusta karta"
            id={"empty-card"}
            onChange={emptyCard}
          />
          <div className="grid md:grid-flow-col gap-1">
            <Button type={"submit"}>Generuj Karty</Button>
            <Button
              onClick={async () => window.print()}
              type={"button"}
              disabled={isDisabled}
            >
              Drukuj
            </Button>
            <Button type={"reset"} onClick={clean}>
              Wyczyść karty
            </Button>
          </div>
        </Form>
      </div>
      <div className="flex items-center flex-col">{workCards}</div>
    </div>
  );
}
