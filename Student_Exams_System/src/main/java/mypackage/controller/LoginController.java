package mypackage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import mypackage.model.LoginDetails;
import mypackage.model.Student_Details;
import mypackage.services.LoginService;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "*",methods = {RequestMethod.POST},allowedHeaders = "*")
public class LoginController {

	@Autowired
	LoginService log_serv;
	
//	to check user is exist or not

	@PostMapping("isexist")
	public Student_Details isExist(@RequestBody LoginDetails login) {
		return log_serv.isUserExist(login);
	}
}
