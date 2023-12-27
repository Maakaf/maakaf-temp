# מדריך תרומה

תודה על הנכונות להשקיע זמן ולתרום לפרויקט!
קראו את ה-[Code of Conduct](./CODE_OF_CONDUCT.md) כדי שנוכל לשמור על הקהילה שלנו נעימה ומכבדת.

## תורמים חדשים

אם מעולם לא תרמתם לקוד פתוח, צפו [בסרטון ההדרכה](https://youtu.be/IVNxfbHNHZk?si=K7eB4yc0ASt59W_I) הקצר שמדגים תרומה ראשונית לקוד פתוח בפרויקט התרגול של הקהילה.

אם יש לכם כח, הנה עוד מידע רלוונטי בנושא:

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Understanding the GitHub flow](https://guides.github.com/introduction/flow/)
- [GitHub Help Documentation](https://help.github.com/)
- [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/)

## תהליך תרומה לפרויקט

### איך להוסיף תוכן לאתר?

כל התוכן נמצא בקבצי md שמכילים טקסט פשוט.
כדי להוסיף ולערוך תכנים באתר, קודם חשוב להבין איך הוא בנוי.

#### איך האתר בנוי

**תיקיית `pages`**

מכילה את עמודי הקטגוריה הראשיים, אלו שמופיעים בתפריט העליון (עמוד הבית, מתחילים, משתתפים וכו').

**תיקיית `content`**

מכילה את התכנים שמקושרים לכל עמוד קטגוריה, בתוך התיקייה המתאימה. אלו התכנים שמוצגים בתפריט הצד.

![מבנה האתר](https://github.com/Maakaf/maakaf-temp/assets/116891360/475e794e-6c71-4536-81cb-5b909e5182bb)

#### הוספת תוכן לאתר

אתרו את המיקום שאליו תרצו להוסיף תוכן. האם אתם רוצים לבצע שינויים בתוכן קיים בעמוד הקטגוריה עצמו? או אולי להוסיף עמוד חדש תחת עמוד קטגוריה מסוים?

אם אתם לא בטוחים - צרו איתנו קשר ע"י תיוג באישיו / כתבו בדיסקורד.

### התקנה מהירה
משתמשי מאק יכולים להנות מהתקנה מהירה ע"י הרצת הפקודות הבאות:
```shell
brew install cocmd/tap/cocmd
cocmd run maakaf.onboarding --from https://github.com/Maakaf/maakaf-temp
```

### צרו Fork לריפו

צרו בגיטהאב שלכם [Fork לפרויקט](https://github.com/Maakaf/maakaf-temp)

### צרו Clone לפרויקט

צרו Clone מקומי ל-Fork על ידי:

```shell
git clone https://github.com/[your-github-user]/maakaf-temp.git
cd maakaf-temp
```

### התקינו ספריות

התקנת הספריות דורשת nodejs מגרסא 14.22+

Please use [pnpm](https://pnpm.io/installation) as package manger instead of npm

```shell

# install dependencies
pnpm i

# add new packages, if needed
pnpm add

# remove unused packages, if needed
pnpm remove

# run a script from package.json
pnpm <script-name>
pnpm dev
pnpm build
```

### צרו Branch

צרו Branch עבור הפיצ'ר שתרצו לעבוד עליו

```shell
git checkout -b my-new-feature
```

### בצעו את השינויים מקומית

זה הזמן לקודד!

#### עבור תוכן טבלאי יש להוסיף קובץ בתקיית `assests/table_data`

### עשו Commit לשינויים

עשו Commit לשינויים שביצעתם על ידי:

```shell
git commit -m 'Add some feature'
```

### דחפו את השינויים

דחפו את השינויים ל-Fork שלכם

```shell
git push -u origin my-new-feature
```

### פתחו Pull request

כשסיימתם לעבוד על השינויים שלכם, פתחו PR בפרויקט.

### קוד ריוויו

כל התרומות לפרויקט עוברות קוד ריוויו על ידי מנהלי הפרויקט לפני שהן ממוזגות אליו.

### איך Issues עובדים

#### יצירת Issue חדש

אם זיהיתם בעיה בקוד שאתם מאמינים שצריך לתקן, או שיש לכם רעיון לפיצ'ר חדש, בדקו את רשימת האישיוז הקיימים פה [Issues](https://github.com/Maakaf/maakaf-temp/issues)
אם אין אישיו פתוח שמתייחס לבעיה שזיהיתם, פתחו אחד חדש.
תנו לאישיו כותרת ותיאור ברורים, הסבירו איך לשחזר את הבעיה, צרפו צילומי מסך, וספקו כל מידע שיעזור לאחרים להבין את כוונתכם.

#### פתירת Issue קיים

עברו על האישיוז הקיימים [Issues](https://github.com/Maakaf/maakaf-temp/issues) ומצאו אחד שמעניין אתכם.
וודאו שאין מישהו שמטפל באישיו הזה כבר, והגיבו עליו בבקשה לקבל אותו.
לאחר שהוגדרתם כ-assignee לאישיו, תוכלו להתחיל לעבוד עליו.
עקבו אחר השלבים שתוארו למעלה.

### ה-PR שלכם מורג'ג'

הידד! :tada::tada:
ברגע שה-PR שלכם מוזג אל הפרויקט, התרומה שלכם תופיע לייב באתר ואפשר יהיה לראות אותה [בקוד של הפרויקט ](https://github.com/Maakaf/maakaf-temp)

## כללי הקהילה

הפרויקט הזה עובד לפי [Google's Open Source Community Guidelines](https://opensource.google.com/conduct/).

### קרדיטים

המדריך הזה הוא בהשראת [GitHub docs contributing guide](https://github.com/github/docs/blob/main/CONTRIBUTING.md?plain=1).

## Adding Content in different languages

We currently provide support for both Hebrew and English languages. To organize your content, please place your markdown files within the content directory under the relevant subdirectory.

To filter the content for the desired language, make use of the lang property in the frontmatter of each markdown file. You can trust that it offers type safety, so there's no need to worry!

## Contributor License Agreement

Contributions to this project must be accompanied by a Contributor License
Agreement. You (or your employer) retain the copyright to your contribution;
this simply gives us permission to use and redistribute your contributions as
part of the project. Head over to <https://cla.developers.google.com/> to see
your current agreements on file or to sign a new one.

You generally only need to submit a CLA once, so if you've already submitted one
(even if it was for a different project), you probably don't need to do it
again.
