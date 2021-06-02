import Head from "next/head";
import router from "next/router";
import { tosPPStyle } from "../styles/tos_pp.style";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>プライバシーポリシー | Fast Note</title>
      </Head>

      <div className="pp">
        <div className="content">
          <h1 id="プライバシーポリシー">プライバシーポリシー</h1>
          <p>
            当サイトにおける個人情報の取扱いについて、以下のとおりにプライバシーポリシーを定めます。
          </p>
          <h2 id="個人情報の利用目的">個人情報の利用目的</h2>
          <p>
            当サイトでは、会員登録の際にサービス利用者の Google
            のアカウントを使用します。
            <br />
            また、メールでのお問い合わせの際に、お名前（ハンドルネーム）・メールアドレス等の個人情報をご登録いただく場合があります。
            <br />
            これらの個人情報は、質問に対する回答や必要な情報をご連絡するために利用し、それ以外の目的では利用しません。
          </p>
          <h2 id="個人情報の第三者への開示">個人情報の第三者への開示</h2>
          <p>
            個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。
          </p>
          <ul>
            <li>本人のご了解がある場合</li>
            <li>法令等への協力のため、開示が必要となる場合</li>
          </ul>
          <h2 id="個人情報の開示・訂正・追加・削除・利用停止">
            個人情報の開示・訂正・追加・削除・利用停止
          </h2>
          <p>
            個人情報の開示・訂正・追加・削除・利用停止をご希望の場合には、ご本人であることを確認したうえで、速やかに対応致します。
          </p>
          <h2 id="cookie-について">Cookie について</h2>
          <p>
            当サイトでは、一部のコンテンツにおいて Cookie を利用しています。
            <br />
            Cookie とは、web
            コンテンツへのアクセスに関する情報であり、お名前・メールアドレス・住所・電話番号は含まれません。
            <br />
            また、お使いのブラウザ設定から Cookie を無効にすることが可能です。
          </p>
          <h2 id="著作権について">著作権について</h2>
          <p>
            当サイトで掲載しているコンテンツの著作権・肖像権等は各権利所有者に帰属します。権利を侵害する目的ではありません。
            <br />
            コンテンツに問題がある場合、各権利所有者様本人が直接メールでご連絡下さい。本人確認後、対応致します。
          </p>
          <h2 id="免責事項">免責事項</h2>
          <p>
            当サイトからリンクやバナーなどによって他のサイトに移動した場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
            <br />
            当サイトのコンテンツについて、可能な限り正確な情報を掲載するよう努めていますが、誤情報が入り込んだり、情報が古くなっている場合があります。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
          </p>
          <h2 id="プライバシーポリシーの変更について">
            プライバシーポリシーの変更について
          </h2>
          <p>
            当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。
            <br />
            修正された最新のプライバシーポリシーは常に本ページにて開示されます。
          </p>
          <h2 id="運営者情報">運営者情報</h2>
          <ul>
            <li>運営者：いっぺー（Ippee）</li>
            <li>
              URL：
              <a
                href="https://fast-note-3939b.web.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://fast-note-3939b.web.app/
              </a>
            </li>
            <li>
              Twitter：
              <a
                href="https://twitter.com/Ippee15"
                target="_blank"
                rel="noopener noreferrer"
              >
                @Ippee15
              </a>
            </li>
          </ul>
          <p>
            初出掲載：2021 年 5 月 22 日<br />
            最終更新：2021 年 5 月 22 日
          </p>
        </div>
      </div>

      <style jsx>{tosPPStyle}</style>
    </>
  );
}
