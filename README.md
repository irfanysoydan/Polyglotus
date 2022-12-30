# Proje Başlığı

Kart-Deste Mantığı Bilgiler Öğrenin

## Açıklama

Program içerisinde, arkalı önlü yazı eklenebilen kartlar ile birlikte öğrenmek istediğiniz bilgileri not alarak öğrenebilirsiniz. Kartlarınızı, ona ait bir deste oluşturduktan sonra ekleyebilirsiniz. Eklenen bu kartın ön yüzünde, arka yüzündeki bilgileri anımsatacak bilgiler bulunacaktır. Ön yüzdeki bilgileri gördüğünüzde arka yüzünde ne tarz bir bilgi olduğunu karta tıkladıktan sonra görebilirsiniz. Tıkladıktan sonra tahmin ettiğiniz bilgiyi doğru bildiyseniz "Kolay", yanlış bildiyseniz "Zor" butonuna basabilirsiniz. Kolay seçilen kartlar tekrar sorulmayacaktır. Bu sistemi dilerseniz dil öğrenirken dilerseniz de ezberlemeniz gerken bir bilgi olduğunda kullanabilirsiniz.

## Başlarken

### İndirme İşlemleri

- Projeyi bilgisayarınıza indirin.
- Hem server hem de client klasörleri içerisinde node paketlerini yüklemek için terminal'e (gerekli dizine giderek) "npm install" yazınız.
- Gerekli paketler yüklendikten sonra projenin .env dosyasını oluşturmanız gerekiyor.(.env dosyası içerisinde kullanılacak bilgiler .env.example adlı dosyada verilmiştir.)
- Bu dosya içerisinde DB bağlantısının sağlanması, authorization işlemlerinin yapılması, serverın hangi porttan bağlanacağı ve mail servisinin çalışabilmesi için gerekli tüm değişkenlerin karşılığı doldurulmalıdır. (EMAIL_USER = "resetpolyglotus@gmail.com" - EMAIL_PASSWORD = "rmqzcjeywbxribhv" bilgilerini direkt olarak bu şekilde doldurabilirsiniz.)
- MySQL, NodeJS, Angular teknolojileri bilgisayarınızda yüklü değilse yükleyiniz.
- Son olarak programı çalıştırmadan önce .env dosyası içerisinde verdiğiniz database ile aynı ada sahip bir database schema oluşturun.(MySQL içerisinde)

### Programın Çalıştırılması

- İndirme İşlemlerindeki tüm aşamaları tamamlayın.
- Ardından iki adet terminali aktif hale getirin.
- Birinci terminalde server klasörünün konumuna, ikinci terminalde client klasörünün konumuna getirin.
- Her iki terminalde de "npm start" yazarak server ve client'ı aktif hale getirirek uygulamayı kullanabilirsiniz.

## Yazarlar

- [İrfan Yunus Soydan](https://github.com/irfanysoydan)
- [Ömer Özoğlu](https://github.com/omerozoglu)
- [Ahmet Kaymakcı](https://github.com/olmayannick)
