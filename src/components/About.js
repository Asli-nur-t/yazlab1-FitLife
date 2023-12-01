import React from 'react';
import './alternative.css';

function AboutFitLife() {
    const fitLifeAbout = {
        giris: "FitLife, sağlık, spor, fitness ve diyet konularında bireylere rehberlik eden bir platformdur. Amacımız, insanların sağlıklı bir yaşam tarzı benimsemelerine yardımcı olmak ve onları daha mutlu, dengeli bir hayata yönlendirmektir.",
        vizyon: "FitLife olarak, herkesin sağlıklı yaşam konusunda bilinçli kararlar almasını sağlamayı hedefliyoruz. Sağlıklı bir yaşam tarzının sadece fiziksel değil, aynı zamanda zihinsel ve duygusal sağlığı da kapsadığını biliyoruz.",
        misyon: "Misyonumuz, her bireyin kendi benzersiz ihtiyaçlarına uygun bir sağlık planı oluşturmasına yardımcı olmaktır. Koçlarımız, deneyimleriyle destekleyici bir ortam sunarak, herkesin potansiyelini keşfetmesine ve en iyi versiyonlarına dönüşmesine katkıda bulunur.",
        ekib: "FitLife ekibi, uzmanlık alanlarında derin bilgi ve deneyime sahip olan tutkulu bireylerden oluşmaktadır. Her biri, sağlıklı yaşam tarzı konusunda bilgi ve motivasyonla donatılmıştır ve sizin başarınızı desteklemek için buradadır.",
        bitis:"FitLife olarak, her adımınızda yanınızda olmak ve sağlıklı yaşam hedeflerinizi gerçekleştirmeniz için sizi desteklemekten mutluluk duyuyoruz. Sağlıklı bir yaşam tarzına adım atmak için doğru yerdesiniz!"
    };

    return (
        <div className="about-fitlife">
            <div className="background-image"></div>
            <div className="content">
                <h2>FitLife Hakkında</h2>
                <p><strong> </strong> {fitLifeAbout.giris}</p>
                <p><strong>Vizyonumuz:</strong> {fitLifeAbout.vizyon}</p>
                <p><strong>Misyonumuz:</strong> {fitLifeAbout.misyon}</p>
                <p><strong>Ekibimiz:</strong> {fitLifeAbout.ekib}</p>
                <p><strong> </strong> {fitLifeAbout.bitis}</p>
            </div>
        </div>
    );
}

export default AboutFitLife;
