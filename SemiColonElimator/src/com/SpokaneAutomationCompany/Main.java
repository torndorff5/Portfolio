package com.SpokaneAutomationCompany;

import java.io.*;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
	    //read csv
        try {
            String filename = args[0];
            //replace all semicolons with new line
            File text = new File(filename);
            try {
                BufferedWriter bw = new BufferedWriter(new FileWriter("Output.csv"));
                try {
                    Scanner input = new Scanner(text);
                    while (input.hasNext()) {
                        String buf = input.next();
                        if (buf.contains(";")) {
                            var strings = buf.split(";");
                            for (String s : strings) {
                                bw.write(s);
                                bw.write("\n");
                            }
                        } else {
                            bw.write(buf);
                            bw.write("\n");
                        }
                    }
                } catch (FileNotFoundException e) {
                    System.err.println("File passed in not found.");
                }
            }
            catch(IOException e){
                System.err.println("IDK what this error was.");
            }
        }
        catch (ArrayIndexOutOfBoundsException e){
            System.err.println("Please pass in filename to remove SemiColon.");
        }



    }
}
