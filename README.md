Första arkitekt beslutet var att använda TypeScript istället för JavaScript, vilket var första utmaningen då det är mer strikt och tog längre tid i början att förstå varför vissa fel uppstod. Dock de felen TypeScript fångade sparade tid längre fram.

Projektet växte snabbt, vilket ledde till ett behov av bättre struktur. Jag införde därför separata mappar för components, pages, hooks, contexts, services, types, validators(använder Zod för validering, enkelt att definiera och återanvända schemas) och routes. Detta förbättrade läsbarheten och gjorde det lättare att underhålla och återanvända kod.

Jag valde Vite som byggverktyg för snabbare utveckling och smidigare hot reload jämfört med Create React App. Som stylingverktyg använde jag Tailwind CSS, vilket gjorde det lätt att snabbt bygga gränssnitt, men blev rörigt i längden. I framtiden planerar jag att kombinera Tailwind med .css-filer för återanvändbar stil.

Jag lärde mig även att Tailwind är mobile-first, vilket påverkade hur jag bör tänka kring responsivitet. Att börja med mobilversionen visade sig vara enklare än att skala ner från desktopversionen.

En av de största utmaningarna var hantering av global state, t.ex. varukorg och användare. Här lärde jag mig att använda React Context API, vilket blev en viktig nyckel till en skalbar lösning.

Att arbeta med TypeScript var stundtals krävande, men det hjälpte mig att tänka mer strukturerat kring datatyper och props. Ett förbättringsområde var implementeringen av orderinformationen, som gjordes sent i projektet. Hade jag implementerat detta tidigare hade jag till exempel kunnat använda faktisk orderdata istället för en tillfällig snapshot-lösning, och även skapa en dynamisk 'Mest populära'-sektion baserad på riktiga användardata istället för hårdkodade produkter.

Jag har insett värdet av modulär kod och tydlig arkitektur. Det gör inte bara projektet lättare att arbeta med, utan minskar också risken för fel och underlättar framtida vidareutveckling. Jag tar jag med mig vikten av att planera struktur tidigt, välja rätt verktyg – och att reflektera över processen längs vägen.
# drone-delights
# drone-delights
