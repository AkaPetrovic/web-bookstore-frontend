import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export default function AboutPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>About</h1>
      <p>
        Lanac Knjižare Bookile nastao je u junu 2010. godine pod sloganom
        „Erupcija ideja“.
        <br />
        <br />
        U Beogradu se nalazi sedamnaest od ukupno trideset i dve knjižare (Knez
        Mihailova, Bookile BW Galerija, Kulturni centar Beograda, Ušće Shopping
        Center, Delta City, TC Merkator, SC Stadion Voždovac, RK Zvezda Zemun,
        Sremska 2, Bulevar Tašmajdan, Bulevar City Store, SC Big Fashion, Ada
        Mall, Big Rakovica, Beo SC, Jurija Gagarina). Ostalih šesnaest knjižara
        nalazi se širom Srbije i to u Nišu, Novom Sadu, Zrenjaninu, Čačku,
        Kragujevcu, Šapcu, Užicu, Kruševcu, Valjevu i Pančevu.
        <br />
        <br />
        Osnovu naše ponude čine knjige svih domaćih izdavača. Vodili smo se
        idejom da čitalačkoj publici na jednom mestu ponudimo kvalitetan izbor.
        Možete birati beletristiku, stručnu literaturu, popularnu nauku,
        umetnost, enciklopedijska izdanja, dečje knjige, naučnu i epsku
        fantastiku, sve što poželite da čitate u zavisnosti od Vaših afiniteta.
        <br />
        <br />
        Ono što Bookile čini drugačijim je veliki izbor knjiga na stranim
        jezicima iz oblasti arhitekture, dizajna, umetnosti, grafičkog dizajna.
        U prilici ste da pronađete i veliki broj svetskih hitova koji još nisu
        prevedeni na srpski jezik. U Knjižarama Bookile možete pronaći i bogat
        gift program, kao i papirnu galanteriju, širok izbor kancelarijskog
        materijala, muziku. Knjižare Bookile potrudiće se da vam pomognu da
        živite bogatije i zadovoljnije kroz zabavu, obrazovanje i inspiraciju!
      </p>
      <div className={styles.socialNetworks}>
        <div className={styles.socialNetwork}>
          <FontAwesomeIcon icon={faFacebook} className="fa-2x" />
          <p>@knjizara_bookile</p>
        </div>

        <div className={styles.socialNetwork}>
          <FontAwesomeIcon icon={faInstagram} className="fa-2x" />
          <p>@bookile</p>
        </div>
        <div className={styles.socialNetwork}>
          <FontAwesomeIcon icon={faTiktok} className="fa-2x" />
          <p>@_bookile</p>
        </div>
      </div>
    </main>
  );
}
