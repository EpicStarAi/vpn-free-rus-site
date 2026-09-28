from pathlib import Path
from PIL import Image
import shutil
import argparse
parser=argparse.ArgumentParser()
parser.add_argument('source',type=Path)
parser.add_argument('backup',type=Path)
args=parser.parse_args()
r=args.source.resolve(); w=args.backup.resolve()
logo=Image.open(Path(__file__).with_name('logo.png')).convert('RGBA')
logo=logo.crop(logo.getbbox())
def save_logo(p,size,adaptive=False):
 b=w/'icon-backup'/p.relative_to(r);b.parent.mkdir(parents=True,exist_ok=True)
 if p.exists() and not b.exists():shutil.copy2(p,b)
 canvas=Image.new('RGBA',size)
 im=logo.copy();k=0.61 if adaptive else 1;im.thumbnail((int(size[0]*k),int(size[1]*k)),Image.Resampling.LANCZOS)
 canvas.alpha_composite(im,((size[0]-im.width)//2,(size[1]-im.height)//2));canvas.save(p)
for f in ['client/images/amneziaBigLogo.png','client/images/AmneziaVPN.png','client/images/icon.png']:
 p=r/f;save_logo(p,Image.open(p).size)
p=r/'client/images/app.ico';b=w/'icon-backup/client/images/app.ico';b.parent.mkdir(parents=True,exist_ok=True)
if not b.exists():shutil.copy2(p,b)
logo.resize((256,256),Image.Resampling.LANCZOS).save(p,sizes=[(16,16),(24,24),(32,32),(48,48),(64,64),(128,128),(256,256)])
# Exact displayed Android launcher resources; use adaptive icon safe zone.
for d in (r/'client/android/res').iterdir():
 if d.is_dir() and d.name.startswith(('mipmap-','drawable-')):
  for p in d.glob('*.png'):
   if p.stem in ['icon','icon_round','ic_launcher','ic_launcher_round','ic_launcher_foreground','logo']:
    save_logo(p,Image.open(p).size,p.stem=='ic_launcher_foreground')
for p in (r/'client/android/res/mipmap-anydpi-v26').glob('*.xml'):
 b=w/'icon-backup'/p.relative_to(r);b.parent.mkdir(parents=True,exist_ok=True)
 if not b.exists():shutil.copy2(p,b)
 p.write_text('\n'.join(line for line in p.read_text().splitlines() if '<monochrome ' not in line)+'\n')
print('FREE RUS app, about and launcher icons generated')
