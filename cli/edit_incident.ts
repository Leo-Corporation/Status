import { input, select } from "@inquirer/prompts";
import * as fs from "fs";
import * as path from "path";

const getMdxFiles = (dir: string) => {
    return fs
        .readdirSync(dir)
        .filter((file) => file.endsWith(".mdx"))
        .sort()
        .map((file) => {
            return { name: file, value: file };
        });
};

const appendUpdateSection = (filePath: string, title: string, message: string) => {
    const updateSection = `
<UpdateSection title={${JSON.stringify(title)}} date={new Date("${new Date().toISOString()}")}>
  ${message}
</UpdateSection>
`;
    fs.appendFileSync(filePath, updateSection);
    console.log(`Update section appended to ${filePath}`);
};

const main = async () => {
    const mdxFiles = getMdxFiles("./app/incidents");
    if (mdxFiles.length === 0) {
        console.log("No MDX files found in app/incidents folder.");
        return;
    }

    const selectedFile = await select({
        message: "Select an MDX file:",
        choices: mdxFiles,
    });

    const title = await input({ message: "Enter the title:" });
    const message = await input({ message: "Enter the message:" });

    const filePath = path.join("../app/incidents", selectedFile);
    appendUpdateSection(filePath, title, message);
};

main();
