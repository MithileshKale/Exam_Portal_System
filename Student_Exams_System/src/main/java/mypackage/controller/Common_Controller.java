package mypackage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import mypackage.services.Common_Services;

@RestController
@CrossOrigin(origins = "*",methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT},allowedHeaders = "*")
@RequestMapping("api/count")
public class Common_Controller {
	
	@Autowired
	Common_Services serv;
	
	@GetMapping
	public List<Long> getCount(){
		return serv.getTotalCount();
	}

}
