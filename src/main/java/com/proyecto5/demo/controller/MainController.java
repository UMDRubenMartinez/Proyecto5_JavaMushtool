/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.proyecto5.demo.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 *
 * @author Ruben
 */
@Controller
@Slf4j
public class MainController {
    
    @GetMapping("/")
    public String inicio(){
        return "inicio";
    }
    
    @GetMapping("/login")
    public String login(){
        return "login/login";
    }
    
    @GetMapping("/Ranking")
    public String ranking(){
        return "ranking/Ranking";
    }
    
}
