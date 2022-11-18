import Image from "next/image"; //Used in next to load images at web
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import logoImg from "../assets/logo.svg";
import avatarImg from "../assets/users-avatar-example.png";
import iconCheckImg from "../assets/icon-check.svg";

export default function Home() {
    return (
        <div>
            <main>
                <Image src={logoImg} alt="NLW COPA" />
                <h1>
                    Crie seu próprio bolão da copa e compartilhe entre amigos!
                </h1>
                <div>
                    <Image
                        src={avatarImg}
                        alt="Users example avatar"
                        quality={100}
                    />
                    <strong>
                        <span>+12.592</span> pessoas já estão usando
                    </strong>
                </div>
                <form>
                    <input
                        type="text"
                        required
                        placeholder="Qual nome do seu bolão?"
                    />
                    <button type="submit">CRIAR MEU BOLÃO</button>
                </form>
                <p>
                    Após criar seu bolão, você receberá um código único que
                    poderá usar para convidar outras pessoas 🚀
                </p>
                <div>
                    <div>
                        <Image src={iconCheckImg} alt="Check icon" />
                        <div>
                            <span>+2.034</span>
                            <span>Bolões criados</span>
                        </div>
                    </div>
                    <div>
                        <Image src={iconCheckImg} alt="Check icon" />
                        <div>
                            <span>+2.034</span>
                            <span>Palpites enviados</span>
                        </div>
                    </div>
                </div>
            </main>
            <Image
                src={appPreviewImg}
                alt="Two smartphones showing the application"
                quality={100}
            />
        </div>
    );
}

// export const getServerSideProps = async () => {
//   const response = await fetch('http://localhost:3333/pools/count')
//   const data = await response.json()
//   console.log(data)

//   return {
//     props: {
//       count: data.count,
//     }
//   }
// }
