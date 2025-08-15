using AuthRedux_API.Helpers;
using AuthRedux_API.Models;
using AuthRedux_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthRedux_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly JwtHelper _jwtHelper;

        public AuthController(UserService userService, JwtHelper jwtHelper)
        {
            _userService = userService;
            _jwtHelper = jwtHelper;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            var user = _userService.Register(dto);
            if (user == null) return BadRequest("Username already exists.");
            return Ok(new { user.Id, user.Username });
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _userService.ValidateUser(dto);
            if (user == null) return Unauthorized("Invalid credentials.");
            var token = _jwtHelper.GenerateToken(user);
            return Ok(new { token });
        }
    }


}
