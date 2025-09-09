# Labovu sizem problemlərinizi həll edəcəkdir — Demo (Browser-only)

Bu layihə GitHub Pages üçün hazır statik saytdır (HTML/CSS/JS). Server tələb etmir.

## Funksiyalar
- Giriş kodu: **54321** (klientdə SHA-256 ilə yoxlanılır).
- PDF (Qaydalar) və Word (Nəticələr) fayllarını seçirsiniz.
- Hər iki fayldan sonra **Minecraft üslublu dub düyməsi** görünür.
- Düyməni basanda:
  - *Minecraft klik səsinə bənzər* səs səslənir (WebAudio ilə sintez olunur).
  - Butulka 6 saniyəyə tədricən dolur.
  - Sonra **Yüklə nəticə** aktiv olur (brauzerdə `netice.txt` yaradılır).

## Quraşdırma (GitHub Pages)
1. Bu qovluğu GitHub-da yeni repoya yükləyin.
2. **Settings → Pages** bölməsinə keçib, Source olaraq **Deploy from a branch** seçin.
3. `main` branch və `/root` qovluğu (və ya `/`) seçin, **Save** edin.
4. Bir neçə dəqiqədən sonra saytınız aktiv olacaq.

## Qeyd
Bu demo real fayl emalı/əsaslandırma etmir; hər şey brauzerdə vizual olaraq göstərilir.
