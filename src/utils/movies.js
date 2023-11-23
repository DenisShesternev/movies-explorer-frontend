const movies = [
  {
    id: 1,
    title: '33 слова о дизайне',
    duration: '1ч42м',
    image: 'https://s3-alpha-sig.figma.com/img/71a2/3794/3bfd6b9af4141d2ee15e36a186b073a7?Expires=1701648000&Signature=cVo~S9vy8oRORIc7KMJXhbXMRsCIAU6kqTq58Pd54BBfeXj05ihqZBWksuLKG2BpWMvq2cc~KIn1mKfIpvcqAb3A~6Rj2fKEI2ThyQij8J3l-ETDo6BW9sDGsvMJr7SqQXG0v-5z~SFlZjyEx7mFcdJzQlZWkDSVU0E1M1u~mm0DxSj6oH5jouDCvp8m3PCLa33rjZTP-ZClffT8X97-feSmWS-tdfMWenhFBuQpmFWiZ7qOWm6NqlFhgcF33gQpqwp0bjAF12PfNA56apXzzMKeOiPdGtmSnO1v572YX7V~6tQGLA94iiN~zPbZCgEeumXVZNWfNuXV6VEOgi7ClA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 2,
    title: 'Киноальманах «100 лет дизайна»',
    duration: '1ч 42м',
    image: 'https://s3-alpha-sig.figma.com/img/90ba/2e4b/e072f3f38937c7f5d592d64f3fa59f33?Expires=1701648000&Signature=AjqVpPf4N~u2VhzO0HE95WgWBeeVWj2Jl9cMq3g~H9HcPqV6Ltxtg7~bpUKKfHPr5Cm9hlm-4Ik5gqDY4aOk-H3uhIVTmpEVFEv7d23QMIByTw2Pia8Y7f4mrExzyxU-8jjYF3jRgQXvWQJsJW3iW2hgPn-QB3V6ZnYHchH094xPZieyLulZgMp4pmaHrGazdKnHqQ5S7SEa8abOXcFhRNy9vCRXNZzg7jkxCVyG3FgTpswP-TuEAPn5OF4uBxP8AAYFwAzs-whvaGaHDwi2Fq77E6QZJPd6Xmu8Hm-SkCqsPrutOYJJIgAnhM2fRR~QxBG4rRlNVYutDGn-2hxbZw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 3,
    title: 'В погоне за Бенкси',
    duration: '1ч 42м',
    image: 'https://s3-alpha-sig.figma.com/img/7501/fcae/58fcf299e5a04c29cb37e6280c83da16?Expires=1701648000&Signature=a-fePamrMUD7ueSiX5gJk4vWjvEWoDdj6DolRxCm-vVC48UVcFhL1cluQ7LQe2QqV0l-i6PbYrm9NQ90LRGNgamM8Be3wTq7YKKCDo83HTlNq01KR4a8NpXghdLocyhVOI1SABEfuSJiXIyDo60vi2TPnavlAf9E6DbfAfq15dEAhqQZrr76Hm6q3xuar2G5q-7mz47dE7XPd9E-dJJxU8kIKvnLdh5qTnDBqvO6T7Y7cWNApuB8Op5K6d24q~tfzGY0pNGyB56AXGYMSMWaSc7jVUzKFUXuWBPMcCoL1h5CdtXSbq6bWVjVB00smrVzL2eCqrjHG0j6hHBAWHOJpA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 4,
    title: 'Баския: Взрыв реальности',
    duration: '1ч 42м',
    image: 'https://s3-alpha-sig.figma.com/img/96cc/9d30/2e6653f8a2dbac83b4795cc1e846a243?Expires=1701648000&Signature=J6w2rh8zXvppykqVtYLkK6AciLUXuRXK3UjwrEqzUrx-03teL~F3uHMlrt1VTb1i1RF9EVyzlwuIumnr~aplBK0x-wMINw6aiwj4gDnCt7yYmM6aPxPYQM3DSNZ9xiu6dS~j9JhpZ4Jold5eCr8V8JAUCCNXylgCQhXULcbBWQ6uB~jV~YT2W1L87kmRn2TWcJY4-VoLQAVRlpzRlitHUqkp03bDJuJTaD7sLBxMv~nucOw8sLc-VtZqb8LK-jwuPSKWh6wCQDZ0CESS0A0IpxFzYnLwZprRGTMU1JaKJunk1GcUyk525qRT044JzPurXTL4he2flper6xL0nEWNJQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 5,
    title: 'Бег это свобода',
    duration: '1ч 42м',
    image: 'https://s3-alpha-sig.figma.com/img/b5e4/a6cb/ff07e856bc14f2c67fd3d453609875e8?Expires=1701648000&Signature=j2V46hottElHcGWyp0kamZLZM3r5Y3gYdRL30y1fr2xYkjOLQlw~ZDFh65iwwk51BUGpVVwFvJIwTL-xVj88ePh8-kT9X1HGibFVdqqvS7XeirDB~uvDiTx78BSqPsBCEZEzTtgU1deY2oVeGEj0gzNgV5PmUOkG7a1cxrC10S6R29237eYFXmEV1CfyPs6oKmViA19qY~HuLEi6krypmCXy8n~I4UCnGDV6sps1mie5qXL-EIc8Yht8Q4LhG9TayihxQX9sXDI9fXMxv9cN5AnrU8dO1CrcjPTGfijMvakk6XxADHItcdU5HSlb~9YlvZdlIBChWbfg6XFxUAZnxg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 6,
    title: 'Книготорговцы',
    duration: '1ч 42м',
    image: 'https://s3-alpha-sig.figma.com/img/199d/35fd/ed1213c8b6d45652874df917fdcefb3b?Expires=1701648000&Signature=FuvAb3SgoogzyVnebxuVJKYWioAc7Sx7NXiIx48GQpirhbcCHkLJ3Ijfg6K2MAvDgdGrtL7hyO8t5MkpDLMjMfTbcxmc7twB2jYVfbmHZdaD7GZhudK~iGME06UCSfnbCDgxiXVoXt-SceScZr8ftDOAKq6WWH9QyDLqG~SoXAQFushWMJz9~WhT4z8HOISdYnN~FmKilrbhh55bWBZmwtbwTPXPsgnzWXvl1xzNE3ilQMqVa3e8r6CZVBdH4u-voBBSZLlJBvQdwvqWTd60VPqxFruVvabku-drYpvPrzrqX5h30zLN9vwBC~4ORJONIzRgqCfebkHGSf2tKDWezw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 7,
    title: 'Когда я думаю о Германии ночью',
    duration: '1ч 42м',
    image: 'https://s3-alpha-sig.figma.com/img/16ca/4833/dee0e587ee02e0b9181fbac58ce0aeee?Expires=1701648000&Signature=LBjr3lFdRxEAWiCnOf5l0Qf4tx4ITJIoq9IkslHP7iDO85l-vc2nV-ROKDp8XfxhTg4vcTv-lpRaf~WC5Y9xvX6Pk1vsPk-V0MZgXgaRfhF197P7eLh4-aTW15ZeaQkKH1skFwcZTNftMTFuT2t0aMwpVzqu0fPLLComyhf-n9oQAHAWUqPpy5c5ZT3hFC9mT8fkrTEgKe6z6N69RegSzDbMU9TlcVdJwaOWs7ff37RVs5TtkoUm6gUnADeSAMKnYfCuV2arMb8YJucTIKJAnTVsA1OCmhLNj2DyHLGywXff3anTFNx-i88etkpKyxYyrL2IsZd6~-Fv90kniAZXbA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 8,
    title: 'Gimme Danger: История Игги и The Stooges',
    duration: '1ч 42м',
    image: 'https://www.figma.com/file/6FMWkB94wE7KTkcCgUXtnC/image/db5187faf8c41998d6d82176e93f868814bf1d2b?fuid=1184482201600268806',
  },
  {
    id: 9,
    title: 'Дженис: Маленькая девочка грустит',
    duration: '1ч 42м',
    image: 'https://s3-alpha-sig.figma.com/img/8604/c3a8/492a130e904f2edf96264863e930e51f?Expires=1701648000&Signature=WFCzsdmSyu6iN5z-aRYo2lByqog9g5z1~bFKTUMXrdLK65pMfH7Cj8wffnuuxGi6o4otNpT3ZBaHLA1oT96Mmg04x52CNOnlWQGwOBBrA2SuXEGfaR-2mb1ro3Lk6ybsHcD9p6xj6eUrbz7i7J3MyRJXjFnYda~2Kdd-XR80W3J6frDBJzwtEtI~0w8raP7PIRP8Vus5k0ZI~Wtq5omj1xzlfugnbxrXzYtNlNiKCY7XYDOzkBE1KwVn9sUpz9Pv0CSocU9HIWtUAlBx43OjT-zX4qm93DWwL9NKM1VQMnQfewOPtD5jxvDv~A9Inm58kbDlgIJg4Qllyl5AqsED7A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 10,
    title: 'Соберись перед прыжком',
    duration: '1ч 42м',
    image: 'https://s3-alpha-sig.figma.com/img/532b/0b33/a7e2023e9428929e8632172735ff18f5?Expires=1701648000&Signature=NnXp7n9dKgAYLKYQPfJj-0iWWAd6~exZd1U4H~LcytCCxTo8c0pS9CZPLX--Wv78DHK6Sx5fb3g7eytJl9TBqcALlEwaj3RaQWKR6AyD14bU8xIgJ5kAc5JH4KZ3lm1a1LDzjg-GurLVCvFyxAEHWu-tehUhHDBsLeWOQPvm~pVg4CRjXMk~5dqsISAaFVH4Qv8KL8DU~k0vVJi5j2MebuJxY4AuSjrCgrhtgl1ekGk5bHMv8WWywyV47iZN9Kl3OsTfpG3Xd8UdGPOyA~UGv4baNZ0y5yCAVWfr8zWsXnRJ-acCMXiDp6cZHLbCGwwcDmEgu8A4Cw9XdBXxiHcbmA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 11,
    title: 'Пи Джей Харви: A dog called money',
    duration: '1ч 42м',
    image: 'https://s3-alpha-sig.figma.com/img/ff18/63df/9c469b036f5505dd9a947241f21f8245?Expires=1701648000&Signature=Yb6yqNsvs2WAEUEQ5su36il5aF8b8roKrYcI6HHlWHU8yWy3IFhaAJQQ88avPb1zBf8Agxbw2TxnUwIF81~u~Xak3pyCSs-I-~Ktzy-XPky7Q~n01G5rvgpus~t9xiW7a8jrRpbJSvvlPt8UkeVXfVfKcgvjMamrkmEGDtgk6r1X2oR-7q9hRz~ABINuYhBDe66mBo8ui95NUC7eXBiPZz5oo8EsEkYN8f7bnfj0h~yxO8a5wN32kc~y-wjTkfFnzQiPq8Af42oCQ-7Kf-wnF2lR1S2J07CBVk1lT8N-Qecoxo~-pHVdtKchj3Dg9d7nJdiEeKBFpWyRA6kwAYweCA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 12,
    title: 'По волнам: Искусство звука в кино',
    duration: '1ч 42м',
    image: 'https://s3-alpha-sig.figma.com/img/9f37/4383/9cbecda3e33558c8bfcc052f8002c008?Expires=1701648000&Signature=B-v~XKO-qpsrMnBZB89M2snaW4MrLlE3VvfblgfE28HhalCYXSFTjqGdmv-es88mDYbGmq8O9FeBl9Dzdp6Zralj-komLHBxr6D3rRK23AsZUt6ky3B97fLacA9JtaQIMaSdnwAzcKlszlek2WBF0iyUVWIKpaVBE8G8nUb8e3arUs1TqqvOiWX3dU0OxPI7DrUr7yzMnXWIZQ6UI83b5b~A55i0-aNLLlCOKLlhwkOW5mNWn7A5BjWW4pelTr883XpmnWet61JzxzzQabyph6an8CTXrq-OqBHYB7d6OfOeJ0JNz6QewqFKwkoE~jJl5u9xw4OP699Ul7mAOmjWoA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
];

export default movies;